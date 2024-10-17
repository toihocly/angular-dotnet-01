import { Photo } from './photo';

export interface Member {
  id: number;
  userName: string;
  age: number;
  photoUrl: string;
  dateOfBirth: Date;
  knownAs: string;
  created: Date;
  lastAActive: Date;
  gender: string;
  introduction: string;
  interests: string;
  lookingFor: string;
  city: string;
  country: string;
  photos: Photo[];
}
