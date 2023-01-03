"use client";
import { Message } from '../typings'
import React from "react";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";

const MessageList = () => {
    const { data: messages, error, mutate } = useSWR<Message[]>("/api/getMessages", fetcher);
    return (
        <div>
            {messages?.map((message) => (
                <div key={message.id}>
                    <p>{message.message}</p>
                </div>
            ))}
            <p>message</p>
            <p>message</p>
            <p>message</p>
            <p>message</p>
        </div>
    );
};

export default MessageList;
