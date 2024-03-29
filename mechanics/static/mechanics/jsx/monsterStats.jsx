const { useState, useEffect } = React

function MonsterStats(props) {
    const [monster, setMonster] = useState(undefined)
    const monsterId = parseInt(document.querySelector('#monster-id').value)


    function render() {
        if (monster === undefined) {
            return 'loading'
        }
        else {
            return (
                <div>
                    <Title name={monster.name} />
                    <Stats monster={monster} />
                </div>
            )
        }

    }

    // fetch data for monster
    useEffect(function () {
        fetch('https://mhw-db.com/monsters/' + monsterId)
            .then(response => response.json())
            .then(response => {
                setMonster(response)
            })
    }, [monsterId])

    // change document title
    useEffect(function () {
        if (monster === undefined) { return }
        document.title = monster.name
    }, [monster])


    return render()
}

function Title(props) {
    function render() {
        return (
            <h2>{props.name}</h2>
        )
    }

    return render()
}

function Stats(props) {
    // generate spam text
    // const list = []
    // for (let i = 0; i < 50; i++) {
    //     list.push('this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.this is some text.')
    // }

    function render() {
        return (
            <div id='stats' className='row'>
                {/* parts dmg sever, blunt, range */}
                <table hidden>
                </table>

                {/* elemental parts dmg */}
                <table hidden>

                </table>

                {/* ailments it deals */}
                <table className='col-lg-4'>
                    <thead>
                        <tr><th>Ailments</th></tr>
                    </thead>
                    <tbody>
                        {props.monster.ailments.map((ailment) => (
                            <tr key={ailment.name}><td>{ailment.name}</td></tr>
                        ))}
                    </tbody>
                </table>

                {/* locations */}
                <table className='col-lg-4'>
                    <thead>
                        <tr>
                            <th>Location</th><th>Zone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.monster.locations.map(location => (
                            <tr key={location.name}>
                                <td>{location.name}</td><td>{location.zoneCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* spam text */}
                {/* {list.map((p, index) => (
                    <p key={index}>
                        {p}
                    </p>
                ))} */}

            </div>
        )
    }

    return render()
}

ReactDOM.render(<MonsterStats />, document.querySelector('#monster-stats'))