#!/bin/bash
set -e

# Define database connection parameters
DB_USER="postgres"
DB_NAME="limetless_care"
PSQL="psql -U $DB_USER -d $DB_NAME"
SQL_DIR="/docker-entrypoint-initdb.d/sql/deploy"

echo "Executing SQL deployment scripts..."

# Function to execute a SQL file and update sql_history
execute_sql_script() {
    local script_file="$1"
    local previous_script="$2" # Add parameter for previous script
    echo "Executing script: $script_file"
    $PSQL -f "$script_file"
    if [ $? -eq 0 ]; then
        echo "Successfully executed $script_file. Updating sql_history..."
        if [ -n "$previous_script" ]; then
            $PSQL -c "INSERT INTO public.sql_history (sql_previous_query, sql_now_query, query_status) VALUES ('$previous_script', '$(basename "$script_file")', 'SUCCESS');"
        else
            $PSQL -c "INSERT INTO public.sql_history (sql_now_query, query_status) VALUES ('$(basename "$script_file")', 'SUCCESS');"
        fi
    else
        echo "Error executing script: $script_file"
        exit 1
    fi
}

# Get the last executed script from sql_history
last_executed_script=$($PSQL -c "SELECT sql_now_query FROM public.sql_history ORDER BY ran_timestamp DESC LIMIT 1;" | tail -n 1)

echo "Last executed script: $last_executed_script"

# Find SQL files in the deploy directory, sorted by name
sql_files=$(find "$SQL_DIR" -name "*.sql" | sort)

previous_script="" # Keep track of the previous script

# Iterate through the SQL files and execute them if they haven't been executed
for script_file in $sql_files; do
    script_name=$(basename "$script_file")
    if [[ "$script_name" > "$last_executed_script" || -z "$last_executed_script" ]]; then
        execute_sql_script "$script_file" "$previous_script" # Pass previous script name
        previous_script="$script_name" # Update for the next iteration
    fi
done

echo "Finished executing SQL deployment scripts."
