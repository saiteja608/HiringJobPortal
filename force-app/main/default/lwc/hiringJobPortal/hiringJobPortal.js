import { LightningElement, track } from 'lwc';

const PAGE = {
    LIST    : 'list',
    DETAILS : 'details',
    FORM    : 'form',
    SUCCESS : 'success'
};

export default class HiringJobPortal extends LightningElement {
    @track currentPage = PAGE.LIST;
    @track selectedJobId;
    @track submittedAppId;

    get showJobList()        { return this.currentPage === PAGE.LIST; }
    get showJobDetails()     { return this.currentPage === PAGE.DETAILS; }
    get showApplicationForm(){ return this.currentPage === PAGE.FORM; }
    get showSuccessPage()    { return this.currentPage === PAGE.SUCCESS; }

    handleViewJob(event) {
        this.selectedJobId = event.detail.jobId;
        this.currentPage   = PAGE.DETAILS;
    }

    handleApply() {
        this.currentPage = PAGE.FORM;
    }

    handleBackToList() {
        this.currentPage   = PAGE.LIST;
        this.selectedJobId = null;
    }

    handleBackToDetails() {
        this.currentPage = PAGE.DETAILS;
    }

    handleSubmitSuccess(event) {
        this.submittedAppId = event.detail.applicationId;
        this.currentPage    = PAGE.SUCCESS;
    }
}
