import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@imgtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
