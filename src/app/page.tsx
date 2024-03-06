"use client";
import { useState } from "react";

export default function Home() {
    const [redTeam, setRedTeam] = useState(0);
    const [blueTeam, setBlueTeam] = useState(0);

    return (
        <div className="w-full h-full flex">
            <button
                onClick={() => setRedTeam(redTeam + 1)}
                className="bg-red-500 w-1/2 text-9xl text-neutral-50 "
            >
                {redTeam}
            </button>
            <button
                onClick={() => setBlueTeam(blueTeam + 1)}
                className="bg-blue-500 w-1/2 text-9xl text-neutral-50 "
            >
                {blueTeam}
            </button>
            <button
                onClick={() => {
                    setRedTeam(0);
                    setBlueTeam(0);
                }}
                className="bg-green-600 text-neutral-50 absolute right-1/2 bottom-10 px-5 py-2 text-2xl rounded-md translate-y-1/2 translate-x-1/2"
            >
                Reset
            </button>
        </div>
    );
}
