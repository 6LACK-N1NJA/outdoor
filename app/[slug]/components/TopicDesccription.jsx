export default function TopicDescription({ title, text }) {
    return (
        <section className="m-5">
            <h1 className="text-4xl mb-5">{title}</h1>
            <p className="text-sm lg:text-xl text-zinc-800 text-justify">{text}</p>
        </section>
    )
}
