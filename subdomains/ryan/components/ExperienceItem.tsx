export type ExperienceItemProps = {
    name: string;
    url?: string;
};

export default function ExperienceItem(props: ExperienceItemProps) {
    if (props.url) {
        return (
            <a href={props.url} target="_blank" rel="noopener noreferrer">{props.name}</a>
        )
    }
    return (
        <>{props.name}</>
    )
}