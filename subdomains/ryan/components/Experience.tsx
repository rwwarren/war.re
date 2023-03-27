type ExperienceProps = {
    // using `interface` is also ok
    heading: string;
};

export default function Experience(props: ExperienceProps) {
    return (
        <>
            <h2>{props.heading}</h2>
        </>
    )
}