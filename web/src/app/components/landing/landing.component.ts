import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

export interface LandingCarouselInfo {
  title: string;
  imgage: string;
  alt: string;
  description: string;
}
@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatGridListModule,
    NgbCarouselModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  landingForm: FormGroup = new FormGroup({});

  carouselTileItems: LandingCarouselInfo[] = [
    { title: 'Find and book a doctor near you, instantly!', 
      imgage: 'assets/images/myGC-feature1.png', 
      alt: 'Image of a user searching for a doctor on myGC',
      description: `With our easy search, you can quickly find a medical practitioner near you and immediately see their availability. Find a date
            and time that fits in your schedule and easily identify the different types of consultations each doctor offers.` },
    { title: 'Free, mahala, gratis!', 
      imgage: 'assets/images/myGC-feature2.png',
      alt: 'Image of a user saving money in piggybank',
      description: `Storing your medical history and data should not cost you anything. It's yours, after all! Share your personal and medical
            information with your doctor and receive your sick notes and scripts directly into your App. No limits, free forever.` },
    { title: 'Telehealth video appointments with your doctor', 
      imgage: 'assets/images/myGC-feature3.png',
      alt: 'Image of a user video calling with a doctor on myGC',
      description: `In these trying times where you want to avoid exposure to COVID-19 as much as possible, we make doctors visits easy and
            accessible. Book a consultation ahead of time with your favourite medical practitioner or talk to a doctor available online
            right now.` },
    { title: 'Your medical history in the palm of your hand. Literally.', 
      imgage: 'assets/images/myGC-feature4.png',
      alt: 'Image of a user with myGC on a big phone',
      description: `Can you still remember when last you had a Tetanus shot? What about the date of your last dental check-up?
            myGC makes all of this information accessible in one central app. Just ask your doctor to share your medical data and documents with
            you via the App.` },
    { title: 'Click, pay, done!', 
      imgage: 'assets/images/myGC-feature5.png',
      alt: 'Image of a user happy to be able to pay with her card on her phone',
      description: `No more hassles trying to pay outstanding medical accounts. Now you can pay whenever and wherever you are. It's as easy as
            1-2-3: Click the link in the SMS, pay with your credit or debit card via our secure payment portal, and you're done!` },
    { title: 'Full control over your medical data and who you share it with', 
      imgage: 'assets/images/myGC-feature6.png',
      alt: 'Image of a user sharing his data on myGC',
      description: `prides itself on becoming fully POPIA compliant as well as taking all possible measures to ensure your data stays safe and
            secure. You also have full control over who you share your medical data with - your doctor, your spouse, your whole family, or
            nobody - it's entirely up to you.` },
  ];
  carouselItem: LandingCarouselInfo = this.carouselTileItems[0];
  constructor() {}
  ngOnInit() {
    this.createForm();

  }

  createForm() {
    this.landingForm = new FormGroup({
      searchTerm: new FormControl(''),
      location: new FormControl('', [Validators.required]),
      speciality: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.landingForm?.value);
  }
}
