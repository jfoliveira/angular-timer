import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnInit {
    private static readonly TIME_SEPARATOR = ':';

    duration: number;
    intervalHandler: any;
    remainingSeconds: number;
    startTime: string = '';
    timeDisplay: string;

    constructor() {}

    ngOnInit() {
    }

    onTimerInterval() {
        this.remainingSeconds = (this.remainingSeconds || this.duration) - 1;
        if (this.remainingSeconds <= 0) {
            this.stop();
        }
        this.formatDisplay();
    }

    padLeftZero(value, len){
        return Array(len - String(value).length + 1).join('0') + value;
    }

    formatDisplay() {
        const SECONDS_IN_MINUTE = 60;
        const SECONDS_IN_HOUR = 3600;

        let seconds = this.remainingSeconds;

        let hours: any = Math.floor(seconds / SECONDS_IN_HOUR);
        seconds -= hours * SECONDS_IN_HOUR;

        let minutes: any = Math.floor(seconds / SECONDS_IN_MINUTE);
        seconds -= minutes * SECONDS_IN_MINUTE;

        this.timeDisplay =
            this.padLeftZero(hours, 2) + TimerComponent.TIME_SEPARATOR +
            this.padLeftZero(minutes, 2) + TimerComponent.TIME_SEPARATOR +
            this.padLeftZero(seconds, 2);
    }

    convertStartTimeToSeconds() {
        const TIME_STRING_LENGTH = 8;

        // startTime is expected to have the format HH:MM:SS,
        // therefore the time string should have a fixed length
        if (this.startTime.length != TIME_STRING_LENGTH) {
            return 0;
        }

        let timeParts = this.startTime.split(TimerComponent.TIME_SEPARATOR);
        let hours: number = parseInt(timeParts[0]);
        let minutes: number = parseInt(timeParts[1]);
        let seconds: number = parseInt(timeParts[2]);

        let totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;

        return totalSeconds;
    }

    setDuration() {
        this.duration = this.convertStartTimeToSeconds();
    }

    reset() {
        console.log('reset timer clicked: ', this.startTime);
        this.startTime = '';
        this.timeDisplay = '';
    }

    start() {
        this.setDuration();
        if (this.duration <= 0) {
            return;
        }
        this.intervalHandler = setInterval(() => {
            this.onTimerInterval()
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalHandler)
    }

    stopAndClear() {
        this.stop();
        this.reset();
    }
}