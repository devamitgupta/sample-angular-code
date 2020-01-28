import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMessage {
    message: string;
}

@Injectable()
export class MessageService {
    private isRecordCreatesUpdated = new BehaviorSubject<IMessage>(null);
    $isRecordCreatesUpdated = this.isRecordCreatesUpdated.asObservable();
    private isUserImageUpdated = new BehaviorSubject<string>(null);
    $isUserImageUpdated = this.isUserImageUpdated.asObservable();

    recordCreatedUpdated(data) {
        this.isRecordCreatesUpdated.next(data);
    }

    userImageUpdated(data) {
        this.isUserImageUpdated.next(data);
    }

}
