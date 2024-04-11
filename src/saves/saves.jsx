import React from 'react';

export function Saves() {

    React.useEffect(() => {
        fetch('/api/reactions')
          .then((response) => response.json())
          .then((reactions) => {
            setSaves(reactions);
            localStorage.setItem('reactions', JSON.stringify(reactions));
          })
          .catch(() => {
            const reactionsText = localStorage.getItem('reactions');
            if (reactionsText) {
                setSaves(JSON.parse(reactionsText));
            }
          });
      }, []);

    const [saves, setSaves] = React.useState([])

    const saveRows = [];
    if (saves.length) {
      for (const [i, save] of saves.entries()) {
        saveRows.push(
          <tr key={i}>
            <td>{save.user}</td>
            <td>{save.reaction.forward_name}</td>
            <td>{save.reaction.forward_primer}</td>
            <td>{save.reaction.reverse_name}</td>
            <td>{save.reaction.reverse_primer}</td>
            <td>{save.reaction.fragment_size}</td>
            <td>{save.reaction.polymerase}</td>
            <td>{save.reaction.reaction_cond}</td>
            {/* <td>{save.save}</td>
            <td>{save.date}</td> */}
          </tr>
        );
      }
    } else {
        saveRows.push(
        <tr key='0'>
          <td colSpan='4'>Be the first to score</td>
        </tr>
      );
    }

    return (
        <main>
            <div className="container-fluid">
                <div className="row justify-content-md-center text-center">
                    <h1 className="display-7">Saved Reactions</h1>
                </div>
                <div className="row justify-content-center text-center p-3">
                    <div className="table-responsive">
                    <table className="table" id="tbl_saves">
                        <thead>
                            <tr id="save_rows">
                            <th>User</th>
                            <th>Forward Primer Name</th>
                            <th>Forward Primer</th>
                            <th>Reverse Primer Name</th>
                            <th>Reverse Primer</th>
                            <th>Fragment Size (bp)</th>
                            <th>Polymerase Used</th>
                            <th>Reaction Conditions</th>
                            </tr>
                        </thead>
                        <tbody>{saveRows}</tbody>
                    </table>
                    </div>
                </div>
                <div className="row justify-content-center p-3">
                    <div className="col-md-2">
                    </div>
                </div>
            </div>
        </main>
    );
}