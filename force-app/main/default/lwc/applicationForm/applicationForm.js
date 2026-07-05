import { LightningElement, api, track } from 'lwc';
import submitApplication from '@salesforce/apex/JobPortalController.submitApplication';

const MAX_COVER_LETTER = 2000;

export default class ApplicationForm extends LightningElement {
    @api jobId;

    @track formData = {
        applicantName    : '',
        email            : '',
        phone            : '',
        resumeLink       : '',
        yearsOfExperience: null,
        coverLetter      : ''
    };

    @track isSubmitting  = false;
    @track submitError   = null;
    @track coverLetterError = null;

    get submitButtonLabel() {
        return this.isSubmitting ? 'Submitting...' : 'Submit Application';
    }

    get submitButtonIcon() {
        return this.isSubmitting ? 'utility:spinner' : 'utility:check';
    }

    get coverLetterLength() {
        return (this.formData.coverLetter || '').length;
    }

    get coverLetterClass() {
        return `slds-textarea${this.coverLetterError ? ' slds-has-error' : ''}`;
    }

    handleFieldChange(event) {
        const { name, value } = event.target;
        this.formData = { ...this.formData, [name]: value };
        // clear cover letter error on change
        if (name === 'coverLetter') {
            this.coverLetterError = null;
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {
            this.submitForm();
        }
    }

    validateForm() {
        // Validate all lightning-input fields (triggers built-in browser/SLDS messages)
        const inputs = [...this.template.querySelectorAll('lightning-input')];
        const allInputsValid = inputs.reduce((valid, inp) => inp.reportValidity() && valid, true);

        // Validate textarea manually
        let coverLetterValid = true;
        const cl = (this.formData.coverLetter || '').trim();
        if (!cl) {
            this.coverLetterError = 'Cover letter is required';
            coverLetterValid = false;
        } else if (cl.length > MAX_COVER_LETTER) {
            this.coverLetterError = `Cover letter must be ${MAX_COVER_LETTER} characters or fewer`;
            coverLetterValid = false;
        } else {
            this.coverLetterError = null;
        }

        return allInputsValid && coverLetterValid;
    }

    async submitForm() {
        this.isSubmitting = true;
        this.submitError  = null;
        try {
            const appId = await submitApplication({
                jobId            : this.jobId,
                applicantName    : this.formData.applicantName,
                email            : this.formData.email,
                phone            : this.formData.phone || null,
                resumeLink       : this.formData.resumeLink || null,
                yearsOfExperience: this.formData.yearsOfExperience
                                     ? parseInt(this.formData.yearsOfExperience, 10)
                                     : 0,
                coverLetter      : this.formData.coverLetter
            });
            this.dispatchEvent(new CustomEvent('submitsuccess', {
                detail: { applicationId: appId }
            }));
        } catch (error) {
            this.submitError = error?.body?.message || 'An unexpected error occurred. Please try again.';
        } finally {
            this.isSubmitting = false;
        }
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }
}
