import styles from '@/styles/Home.module.css'
import ActivityList from "@/components/ActivityList";

type ActivityProps = {
    name: string | JSX.Element;
    start?: string;
    end: string;
    items: Array<string | JSX.Element>;
};
export default function Activity(props: ActivityProps) {
    return (
        <div className={styles.activity}>
            <div className={styles.title}><h3>{props.name}</h3></div>
            <div className={styles.date}>{props.start}{props.start && props.end ? ' - ': ''}{props.end}</div>
            <ActivityList items={props.items} />
        </div>
    )
}