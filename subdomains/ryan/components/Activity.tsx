"use client";
import { useEffect, useState, ReactNode } from 'react';
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
export default function Activity(props: ActivityProps) {
    const [duration, setDuration] = useState<React.ReactNode>(null);

    useEffect(() => {
        if(props.start) {
            const end = props.end.toLocaleLowerCase() === 'present' ? new Date() : parse(props.end, 'MMMM yyyy', new Date());
            const durationInterval = intervalToDuration({start: parse(props.start, 'MMMM yyyy', new Date()), end: end});
            let years = null;
            if(durationInterval.years && durationInterval.years > 0){
                years = `${durationInterval.years} ${pluralize('Year', durationInterval.years)}`
            }
            let months = null;
            if(durationInterval.months && durationInterval.months > 0){
                months = `${durationInterval.months} ${pluralize('Month', durationInterval.months)}`
            }
            const totalDuration = [years, months].join(" ").trim()
            setDuration(<h6><meta name="format-detection" content="telephone=no, date=no, email=no, address=no"/>[{totalDuration}]</h6>);
        }
    }, [props.start, props.end]);
    return (
        <div className={styles.activity}>
            <div className={styles.title}><h3>{props.name}{props.company ? `, ` : ''}{props.companyLink ? <a href={props.companyLink} target="_blank">{props.company}</a> : props.company}{props.team ? ` (${props.team})` : ''}</h3>{duration}</div>
            <div className={styles.date}>{props.start}{props.start && props.end ? ' - ': ''}{props.end}</div>
            <ActivityList items={props.items} />
        </div>
    )
}
