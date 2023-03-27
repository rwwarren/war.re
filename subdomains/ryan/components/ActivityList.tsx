import {ReactNode} from "react";

type ActivityListProps = {
    items: Array<string | JSX.Element>;
};

export default function ActivityList(props: ActivityListProps) {
    return (
        <ul>
            {props.items.map((item, idx) => (
                <li key={`activity-list-${idx}`}>{item}</li>
            ))}
        </ul>
    )
}