export default function TopicDescription({ title, text }) {
    return (
        <section className="w-full lg:w-1/2">
            <h1>{title}</h1>
            <p>{text}</p>
        </section>
    )
}
