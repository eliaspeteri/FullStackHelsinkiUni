import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    );
};

const AnecdoteList = (props) => {
    return (
        <>
            {props.anecdotes.map((anecdote) => (
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        props.addVote(anecdote.id, anecdote);
                        props.setNotification(
                            `You voted for '${anecdote.content}'.`,
                            5
                        );
                    }}
                />
            ))}
        </>
    );
};

export default connect((state) => ({ anecdotes: state.anecdotes }), {
    addVote,
    setNotification,
})(AnecdoteList);
