import styles from '@/styles/Home.module.css'
import ActivityList from "@/components/ActivityList";

export default function Activity(props) {
    return (
        <div className={styles.activity}>
            <div className={styles.title}><h3>{props.name}</h3></div>
            <div className={styles.date}>{props.start}{props.start && props.end ? ' - ': ''}{props.end}</div>
            <ActivityList items={props.items} />
        </div>
    )
}