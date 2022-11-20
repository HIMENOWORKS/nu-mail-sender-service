export interface IMail {
    from: string;
    to: string;
    cc?: string[];
    subject: string;
    text: string;
}
