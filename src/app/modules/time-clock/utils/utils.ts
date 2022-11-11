import { Entry } from '../../shared/models';

export default class Utils {
    getEntryRunning(entries: Entry[]) {
        const runningEntry: Entry = entries.find(entry => entry.running === true);
        return runningEntry;
    }
    
    isThereAnEntryRunning(entries: Entry[]) {
        return !!this.getEntryRunning(entries);
    }
}
