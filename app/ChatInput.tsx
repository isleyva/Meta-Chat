"use client"
import React, { FormEvent } from "react";
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Message } from "../typings"
import useSWR from "swr"
import fetcher from "../utils/fetchMessages"
import { Session, unstable_getServerSession } from 'next-auth';

export const ChatInput = ({ session }: {
    session: Session | null;
}) => {
    // input reset handler

    const [input, setImput] = useState("");
    const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher)

    const addMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input || !session) return;
        const messageToSend = input;
        setImput("");

        // id for messages
        const id = uuidv4();

        // Message form 
        const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: session!.user?.name!,
            profilePic: session!.user?.image!,
            email: session!.user?.email!,
        }
        // Send message to server
        const uploadMessageToUpstash = async () => {
            const data = await fetch(
                "/api/addMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            }).then(res => res.json());

            return [data.message, ...messages!]
        }
        await mutate(uploadMessageToUpstash, {
            optimisticData: [message, ...messages!],
            rollbackOnError: true,
        })
    }
    return (
        <form onSubmit={addMessage} className="fixed flex px-10 py-5 w-full bottom-0 z-50 space-x-2 boder-t border-gray-100 bg-white">
            <input
                value={input}
                disabled={!session}
                onChange={e => setImput(e.target.value)}
                type="text"
                placeholder="Enter message here..."
                className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-trasparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed "
            />
            <button
                type="submit"
                disabled={!input}
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Send
            </button>
        </form>
    );
};

