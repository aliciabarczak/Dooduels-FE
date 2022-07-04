import { useEffect, useState } from "react";

const GuessBox = () => {
    const [ words, setWords ] = useState(["cat", "dog", "bird"]);
    const [ currWord, setCurrWord ] = useState(words[Math.floor(Math.random() * words.length)]);
    const [ input, setInput ] = useState("");
    const [ regex, setRegex ] = useState(new RegExp(currWord, "gi"));

    console.log(words)

    useEffect(() => {
        setWords(words.filter(filterWords));
        setRegex(new RegExp(currWord, "gi"));
    }, [currWord]);

    const filterWords = (word) => {
        if (word !== currWord) {
            return word;
        };
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (regex.test(input)) {
            console.log("You guessed correctly!");
            setCurrWord(words[Math.floor(Math.random() * words.length)]);
        };
    };
 
    return (
        <section className="guess-box">
            <p>{currWord}</p>
            <form onSubmit={handleSubmit}>
                <label>Guess the word!</label>
                <input onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
};

export default GuessBox;