import { LightningElement, wire, track } from 'lwc';
import getActiveJobs from '@salesforce/apex/JobPortalController.getActiveJobs';

const ALL_FILTER = 'All';

export default class JobList extends LightningElement {
    @track searchTerm   = '';
    @track activeFilter = ALL_FILTER;
    @track jobs         = [];
    @track error;

    isLoading = true;

    @wire(getActiveJobs)
    wiredJobs({ error, data }) {
        this.isLoading = false;
        if (data) {
            this.jobs  = data;
            this.error = null;
        } else if (error) {
            this.error = error?.body?.message || 'Failed to load jobs.';
            this.jobs  = [];
        }
    }

    get filterOptions() {
        const types = [ALL_FILTER, ...new Set(this.jobs.map(j => j.Type__c).filter(Boolean))];
        return types.map(t => ({
            label   : t,
            value   : t,
            cssClass: `filter-chip ${this.activeFilter === t ? 'filter-chip_active' : ''}`
        }));
    }

    get filteredJobs() {
        const term   = this.searchTerm.toLowerCase();
        const filter = this.activeFilter;
        return this.jobs.filter(j => {
            const matchesSearch =
                !term ||
                (j.Name        || '').toLowerCase().includes(term) ||
                (j.Location__c || '').toLowerCase().includes(term);
            const matchesFilter = filter === ALL_FILTER || j.Type__c === filter;
            return matchesSearch && matchesFilter;
        });
    }

    get hasJobs()   { return !this.isLoading && !this.error && this.filteredJobs.length > 0; }
    get noResults() { return !this.isLoading && !this.error && this.filteredJobs.length === 0; }

    handleSearch(event) {
        this.searchTerm = event.target.value;
    }

    handleFilterClick(event) {
        this.activeFilter = event.currentTarget.dataset.value;
    }

    handleViewJob(event) {
        this.dispatchEvent(new CustomEvent('viewjob', { detail: event.detail }));
    }
}
