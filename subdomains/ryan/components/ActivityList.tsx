import styles from '@/styles/Home.module.css'

export default function ActivityList(props) {
    return (
        <ul>
            {props.items.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}