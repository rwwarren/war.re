import styles from '@/styles/Home.module.css'
import ActivityList from "@/components/ActivityList";
import { intervalToDuration } from "date-fns";
import pluralize from "pluralize";

type ActivityProps = {
    name: string | JSX.Element;
    start?: string;
    end: string;
    items: Array<string | JSX.Element>;
};
export default function Activity(props: ActivityProps) {
    let duration = <></>;
    if(props.start) {
        const end = props.end.toLocaleLowerCase() === 'present' ? new Date() : props.end;
        const durationInterval = intervalToDuration({start: props.start, end: end});
        let years = null;
        if(durationInterval.years && durationInterval.years > 0){
            years = `${durationInterval.years} ${pluralize('Year', durationInterval.years)}`
        }
        let months = null;
        if(durationInterval.months && durationInterval.months > 0){
            months = `${durationInterval.months} ${pluralize('Month', durationInterval.months)}`
        }
        const totalDuration = [years, months].join(" ").trim()
        duration = <h6>[{totalDuration}]</h6>;
    }
    return (
        <div className={styles.activity}>
            <div className={styles.title}><h3>{props.name}</h3>{duration}</div>
            <div className={styles.date}>{props.start}{props.start && props.end ? ' - ': ''}{props.end}</div>
            <ActivityList items={props.items} />
        </div>
    )
}