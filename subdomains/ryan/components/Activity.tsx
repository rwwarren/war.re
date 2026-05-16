import { ReactNode } from 'react';
import styles from '@/styles/Home.module.css'
import ActivityList from "@/components/ActivityList";
import { intervalToDuration, parse } from "date-fns";
import pluralize from "pluralize";

type ActivityProps = {
    name: string | ReactNode;
    company?: string;
    team?: string;
    start?: string;
    end: string;
    items: Array<string | ReactNode>;
    companyLink?: string;
};

function formatDuration(start: string, end: string): string {
    const endDate = end.toLowerCase() === 'present' ? new Date() : parse(end, 'MMMM yyyy', new Date());
    const interval = intervalToDuration({ start: parse(start, 'MMMM yyyy', new Date()), end: endDate });
    const parts = [];
    if (interval.years && interval.years > 0) parts.push(`${interval.years} ${pluralize('Year', interval.years)}`);
    if (interval.months && interval.months > 0) parts.push(`${interval.months} ${pluralize('Month', interval.months)}`);
    return parts.join(' ');
}

export default function Activity(props: ActivityProps) {
    const duration = props.start ? formatDuration(props.start, props.end) : null;
    return (
        <div className={styles.activity}>
            <div className={styles.title}><h3>{props.name}{props.company ? `, ` : ''}{props.companyLink ? <a href={props.companyLink} target="_blank" rel="noopener noreferrer">{props.company}</a> : props.company}{props.team ? ` (${props.team})` : ''}</h3>{duration && <h6><meta name="format-detection" content="telephone=no, date=no, email=no, address=no"/>[{duration}]</h6>}</div>
            <div className={styles.date}>{props.start}{props.start && props.end ? ' - ': ''}{props.end}</div>
            <ActivityList items={props.items} />
        </div>
    )
}
