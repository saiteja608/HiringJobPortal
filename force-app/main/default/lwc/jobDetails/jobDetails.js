import { LightningElement, api, wire, track } from 'lwc';
import getJobById from '@salesforce/apex/JobPortalController.getJobById';

const TYPE_BADGE_MAP = {
    'Full-Time'  : 'badge-full-time',
    'Part-Time'  : 'badge-part-time',
    'Contract'   : 'badge-contract',
    'Internship' : 'badge-internship',
    'Remote'     : 'badge-remote'
};

export default class JobDetails extends LightningElement {
    @api jobId;
    @track job;
    @track error;
    isLoading = true;

    @wire(getJobById, { jobId: '$jobId' })
    wiredJob({ error, data }) {
        this.isLoading = false;
        if (data) {
            this.job   = data;
            this.error = null;
        } else if (error) {
            this.error = error?.body?.message || 'Failed to load job details.';
            this.job   = null;
        }
    }

    get typeBadgeClass() {
        const base = 'job-type-badge';
        const mod  = TYPE_BADGE_MAP[this.job?.Type__c] || 'badge-default';
        return `${base} ${mod}`;
    }

    get skillsList() {
        return (this.job?.Skills_Required__c || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
    }

    handleApply() {
        this.dispatchEvent(new CustomEvent('apply'));
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }
}
