# sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName] -l ts
# ./node_modules/.bin/sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -l ts -t [tableName]
## All models
# ./node_modules/.bin/sequelize-auto -h db -d boilerplate -u postgres -x postgres -p 5432 --dialect postgres -o ./models-development -l ts

## Single table
# ./node_modules/.bin/sequelize-auto -h db -d boilerplate -u postgres -x postgres -p 5432 --dialect postgres -o ./models-development -l ts -t verify_contact

# When creating new models let sequelize-auto generate the models into a temp directory and then just copy the new models into the correct directory. This way you can easily see what has changed and you can also easily remove any models that are no longer needed.
