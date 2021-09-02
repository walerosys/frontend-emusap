import React, { Fragment, useState, useEffect } from 'react'
import { CardBody, Card, Row, Col } from 'reactstrap'
import moment from 'moment';
import "moment/locale/es";
import ReactPlayer from 'react-player'
import { useSpeechSynthesis } from 'react-speech-kit';

//const Marquee = require('react-double-marquee');

const MonitorActual = () => {

    const videosActivos = [{ nombre: 'videos/Mejores Bromas - Ladrones de Banco.mp4', play: false },
    { nombre: 'videos/videoplayback-2.mp4', play: false },
    { nombre: 'videos/videoplayback.mp4', play: false }
    ]
    const [value, setValue] = useState('');
    const { speak } = useSpeechSynthesis();
    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }

    });


    const [videos, setVideos] = useState(
        videosActivos
    );


    const [video, setVideo] = useState("")

    //  useEffect(() => {
    //      setVideos([...videos,videos[play][0] = true])
    //  }, [])

    useEffect(() => {
        let contador = 0;
        for (let x in videos) {
            if (videos[x].play === false) {
                setVideo(videos[x].nombre)
                break;
            } else {
                contador++
            }
        }
        if (videos.length === contador) {
            setVideos(videosActivos)
        }
    }, [videos])

    const handleEnded = () => {
        console.log("TERMINO")
        for (let x in videos) {
            if (videos[x].play === false) {
                setVideos([...videos, videos[x].play = true])
                break
            }
        }

    }


    return (
        <Fragment>
            <Row>
                <textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <button onClick={() => speak({ text: value })}>Speak</button>
            </Row>
            <Card style={{ height: 650 }}>
                <CardBody style={{ padding: 0 }}>
                    <Row>
                        <Col className="text-center" style={{ padding: 0 }}>
                            <Card style={{ height: 40, background: '#626ed4', margin: 0, color: 'white' }}>
                                <CardBody style={{ paddingTop: '0.5%' }}>

                                    <marquee><h4>Subgerencia de Tesorería - {moment(date).format('LLL')}</h4></marquee>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 295, background: '#6c757d', margin: 0 }}>
                                <CardBody style={{ paddingTop: 0, paddingBottom: 0 }}>
                                    {/* <ReactPlayer url={'https://www.youtube.com/watch?v=Kqg8zLgESyQ&t=35s'} /> */}

                                    <ReactPlayer
                                        playing
                                        url={video}
                                        width="100%"
                                        height="100%"
                                        controls={true}
                                        onEnded={handleEnded}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 70, background: '#02a499', margin: 0, color: 'white' }}>
                                <CardBody style={{ paddingTop: '1.5%' }}>
                                    <Row><Col className="text-center"><h5>Enrique Gonzales P.</h5></Col></Row>
                                    <Row><Col className="text-center"><h5>G000 - V4</h5></Col></Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 70, background: '#ec4561', margin: 0, color: 'white' }}>
                                <CardBody style={{ paddingTop: '1.5%' }}>
                                    <Row><Col className="text-center"><h5>Sofia Gonzales P.</h5></Col></Row>
                                    <Row><Col className="text-center"><h5>P000 - V1</h5></Col></Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 70, background: '#02a499', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 70, background: '#02a499', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 70, background: '#02a499', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 70, background: '#02a499', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center" style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#f8b425', margin: 0, color: 'white' }}>
                                <CardBody style={{ paddingTop: '1%' }}
                                ><h5>GENERAL</h5></CardBody>
                            </Card>
                        </Col>
                        <Col className="text-center" style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#f8b425', margin: 0, color: 'white' }}>
                                <CardBody style={{ paddingTop: '1%' }}
                                ><h5>PREFERENCIAL</h5></CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center" style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#38a4f8', margin: 0, color: 'white' }}>
                                <CardBody style={{ paddingTop: '1%' }}>
                                    <h5>Ana Nuñez M. - G004</h5>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#38a4f8', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#38a4f8', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#38a4f8', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#38a4f8', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#38a4f8', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#38a4f8', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                        <Col style={{ padding: 0 }}>
                            <Card style={{ height: 35, background: '#38a4f8', margin: 0 }}>
                                <CardBody></CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    )
}


export default MonitorActual


