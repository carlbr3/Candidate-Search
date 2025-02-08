// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {
    readonly Name: string | null;
    readonly Username: string | null;
    readonly Email: string | null;
    readonly Location: string | null;
    readonly Avatar: string | null;
    readonly Company: number | null;
    readonly Html_url: number | null;
}