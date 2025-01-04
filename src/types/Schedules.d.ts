export default interface ISchedule {
    _id: string;
    date: string;
    consultId: string | null;
    user: {
        _id: string;
        name: string;
    };
    patient: {
        _id: string;
        name: string;
    };
}