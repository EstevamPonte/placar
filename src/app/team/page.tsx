"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Team() {
    const [team, setTeam] = useState([] as string[]);
    const [name, setName] = useState("");
    const [teamNumber, setTeamNumber] = useState(2);
    const [finalTeams, setFinalTeams] = useState([] as string[][]);
    const [peapleOut, setPeapleOut] = useState([] as string[]);

    const colors = [
        "border-orange-400",
        "border-yellow-400",
        "border-lime-400",
        "border-emerald-400",
    ];

    useEffect(() => {
        const localTeam = JSON.parse(localStorage.getItem("team") || "[]");
        const finalTeam = JSON.parse(localStorage.getItem("finalTeam") || "[]");
        const peapleOut = JSON.parse(localStorage.getItem("peapleOut") || "[]");

        if (finalTeam) {
            setFinalTeams(finalTeam);
        }
        if (peapleOut) {
            setPeapleOut(peapleOut);
        }
        if (localTeam) {
            setTeam(localTeam);
        }
    }, []);

    function submitTeam() {
        if (!name) return;
        setTeam((prev) => {
            const nextValue = [...prev, name];
            const alreadyHasOnTheList = prev.find((item) => item === name);
            if (alreadyHasOnTheList) return prev;
            localStorage.setItem("team", JSON.stringify(nextValue));
            return nextValue;
        });
        setName("");
    }

    function deleteMember(name: string) {
        const member = name.toLocaleLowerCase().replace(" ", "");

        setTeam((prev) => {
            const nextValue = prev.filter(
                (item) => item.toLocaleLowerCase().replace(" ", "") !== member
            );
            localStorage.setItem("team", JSON.stringify(nextValue));
            console.log(nextValue);
            return nextValue;
        });
        setName("");
    }

    function shuffle() {
        const peapleCount = team.length;
        const teamBackup = [...team];
        let peaplePerTeam = Math.floor(peapleCount / teamNumber);
        const teams = [];
        for (let i = 0; i < teamNumber; i++) {
            const teamSelection = [];
            for (let i = 0; i < peaplePerTeam; i++) {
                const randomIndex = Math.floor(
                    Math.random() * teamBackup.length
                );
                teamSelection.push(teamBackup[randomIndex]);
                teamBackup.splice(randomIndex, 1);
            }
            teams.push(teamSelection);
        }

        setFinalTeams(teams);
        setPeapleOut(teamBackup);

        localStorage.setItem("finalTeam", JSON.stringify(teams));
        localStorage.setItem("peapleOut", JSON.stringify(teamBackup));
    }

    return (
        <div className="container m-auto p-2 lg:p-0">
            <div className="flex flex-col items-center gap-3 mt-10 m-auto">
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Digite o nome da pessoa"
                    className="border-2 border-gray-400 rounded-md p-2"
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    type="button"
                    onClick={submitTeam}
                    className="bg-green-600 text-neutral-50 px-3 py-2 text-base rounded-md "
                >
                    Adicionar pessoa
                </button>
            </div>

            <div className="block">
                <div className="grid grid-cols-3 lg:flex lg:flex-row items-center gap-4 mt-10 bg-gray-100 rounded-md p-4">
                    <input
                        type="radio"
                        id="teamNumber2"
                        className="hidden peer/2"
                        value={2}
                        name="teamNumber"
                        checked={teamNumber === 2}
                        onChange={(e) => setTeamNumber(Number(e.target.value))}
                    />
                    <label
                        htmlFor="teamNumber2"
                        className="cursor-pointer border-2 border-transparent p-2 rounded-md peer-checked/2:border-blue-400 text-center"
                    >
                        2 Times
                    </label>
                    <input
                        type="radio"
                        className="hidden peer/3"
                        id="teamNumber3"
                        value={3}
                        name="teamNumber"
                        checked={teamNumber === 3}
                        onChange={(e) => setTeamNumber(Number(e.target.value))}
                    />
                    <label
                        htmlFor="teamNumber3"
                        className="cursor-pointer border-2 border-transparent p-2 rounded-md peer-checked/3:border-blue-400 text-center "
                    >
                        3 Times
                    </label>
                    <input
                        className="hidden peer/4"
                        type="radio"
                        id="teamNumber4"
                        value={4}
                        name="teamNumber"
                        checked={teamNumber === 4}
                        onChange={(e) => setTeamNumber(Number(e.target.value))}
                    />
                    <label
                        htmlFor="teamNumber4"
                        className="cursor-pointer border-2 border-transparent p-2 rounded-md peer-checked/4:border-blue-400 text-center"
                    >
                        4 Times
                    </label>

                    <button
                        type="button"
                        onClick={shuffle}
                        className="bg-green-600 text-neutral-50 px-3 py-2 text-base rounded-md col-span-2"
                    >
                        Criar times
                    </button>
                    <Link
                        href={"/"}
                        className="bg-blue-700 text-neutral-50 px-3 py-2 text-base rounded-md col-span-1 text-center"
                    >
                        Placar
                    </Link>
                </div>
                <h2 className="text-2xl font-bold mt-10 mb-3">
                    {team.length} Participantes
                </h2>
                <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 ">
                    {team.map((person) => (
                        <li
                            className="border-2 border-gray-400 rounded-md p-2 w-full relative"
                            key={person}
                        >
                            {person}
                            <button
                                onClick={() => deleteMember(person)}
                                className="absolute rounded-full bg-red-500 -top-3   h-6 w-6 right-0  text-sm"
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="grid grid-cols-2 gap-3 mt-10">
                    {finalTeams.map((team, index) => (
                        <div
                            className={`flex flex-col items-center gap-3 mt-10 ${colors[index]}`}
                            key={index}
                        >
                            <h2 className="text-2xl font-bold">
                                Time {index + 1}
                            </h2>
                            <ul className="flex flex-col items-center gap-3 w-full">
                                {team.map((person) => (
                                    <li
                                        className={`border-2 rounded-md p-2 w-full ${colors[index]}`}
                                        key={person}
                                    >
                                        {person}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {peapleOut.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mt-10">De fora</h2>
                        <ul className="flex flex-col items-center gap-3 w-full mt-10">
                            {peapleOut.map((person) => (
                                <li
                                    className="border-2 border-gray-400 rounded-md p-2 w-full"
                                    key={person}
                                >
                                    {person}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
