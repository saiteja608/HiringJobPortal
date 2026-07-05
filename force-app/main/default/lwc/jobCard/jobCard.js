import { LightningElement, api } from 'lwc';

const TYPE_BADGE_MAP = {
    'Full-Time'  : 'badge-full-time',
    'Part-Time'  : 'badge-part-time',
    'Contract'   : 'badge-contract',
    'Internship' : 'badge-internship',
    'Remote'     : 'badge-remote'
};

export default class JobCard extends LightningElement {
    @api job;

    get typeBadgeClass() {
        const base = 'job-type-badge';
        const mod  = TYPE_BADGE_MAP[this.job?.Type__c] || 'badge-default';
        return `${base} ${mod}`;
    }

    handleViewDetails() {
        this.dispatchEvent(new CustomEvent('viewjob', { detail: { jobId: this.job.Id } }));
    }
}
