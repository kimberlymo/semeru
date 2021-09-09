import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function StatisticDetailed() {
    const [data, setData] = useState();
    const {docID} = useParams();

    useEffect(() => {

    }, []);
    return (
        <Container>

        </Container>
    )
}