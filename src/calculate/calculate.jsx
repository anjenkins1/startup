import React from 'react';

import Button from 'react-bootstrap/Button';

export function Calculate(props) {

    const [fPName, setFPName] = React.useState('');
    const [fPrimer, setFPrimer] = React.useState('');
    const [fPnt, setFPnt] = React.useState(0);
    const [fPGC, setFPGC] = React.useState(0);
    const [fPTm, setFPTm] = React.useState(0);

    const [rPName, setRPName] = React.useState('');
    const [rPrimer, setRPrimer] = React.useState('');
    const [rPnt, setRPnt] = React.useState(0);
    const [rPGC, setRPGC] = React.useState(0);
    const [rPTm, setRPTm] = React.useState(0);


    const [polyermase, setPolymerase] = React.useState('Q5');
    const [productSize, setProductSize] = React.useState(0);
    const [isKB, setIsKB] = React.useState('bp')
    const [reactCondtions, setReactConditions] = React.useState('2-Step');

    const [calculatedConditions, setCalcConditions] = React.useState('');

    const pcrLenSelector = (event) => {
        setIsKB(event.target.value)
        if (event.target.value === "kb") {
             setProductSize(productSize * 1000)
         } 
        else {
             setProductSize(productSize / 1000)
         }
    }

    const calculateValues = (primer, setPnt, setPGC, setPTm) => {
        const ntCount = primer.length;
        const gcCount = (primer.match(/[GCgc]/g) || []).length;
        const tm = calculateTm(gcCount, ntCount);
        setPnt(ntCount);
        setPGC((gcCount / ntCount) * 100);
        setPTm(tm);
      };
    
    const calculateTm = (gcCount, ntCount) => {
        const tm = 64.9 + 41 * (gcCount - 16.4) / (ntCount);
        return tm;
    };

    const handlePrimerInput = (e, setPrimer, setPnt, setPGC, setPTm) => {
        const primer = e.target.value;
        setPrimer(primer);
        calculateValues(primer, setPnt, setPGC, setPTm);
    };

    const calculateRow = (
        <tr>
            <td>{fPName}</td>
            <td>{fPrimer}</td>
            <td>{rPName}</td>
            <td>{rPrimer}</td>
            <td>{productSize}</td>
            <td>{polyermase}</td>
            <td>{reactCondtions}<br/>{calculatedConditions}</td>
        </tr>
    );

    const calculate = () => {
        let anneal_temp = Math.min(fPTm, rPTm);
        let extension_time = 60; // seconds
        let extension_temp = 68; // Celsius
    
        if (polyermase === "Q5") {
          anneal_temp += 5;
          extension_time = 20; // seconds
          extension_temp = 72; // Celsius
        }
    
        let middle_steps;
        if (reactCondtions === "2-Step") {
          middle_steps = (
            <div>
              2-step, 30x:<br/>
              98C for 15 sec<br/>
              {anneal_temp}C for {extension_time} seconds
            </div>
          );
        } else {
          middle_steps = (
            <div>
              3-step, 30x:<br/>
              98C for 10 sec<br/>
              {anneal_temp}C for 20 seconds<br/>
              {extension_temp}C for {extension_time} seconds
            </div>
          );
        }
    
        setCalcConditions(middle_steps);
      };

    return (
        <main className='container-fluid text-center'>
            <div className="users">
                <div className="user">
                Scientist:
                <span className="user-name">{props.userName}</span>
                </div>
                Messages:
                <div id="user-messages" />
            </div>
            <div className="container-fluid">
                <div className="row justify-content-md-center text-center">
                    <h1 className="display-7">Reaction Calculator</h1>
                </div>
            <form>
                <div className="row justify-content-center p-3">
                    <div className="col-md-3">
                        <label htmlFor="forward_primer_name" className="form-label">Forward Primer Name</label>
                        <input 
                            className="form-control" 
                            type="text"
                            onChange={(e) => setFPName(e.target.value)}
                            id="forward_primer_name" 
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="forward_primer" className="form-label">Forward Primer</label>
                        <input 
                            className="form-control" 
                            type="text"
                            onChange={(e) => handlePrimerInput(e, setFPrimer, setFPnt, setFPGC, setFPTm)}
                            id="forward_primer" 
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="forward_data" className="form-label"><strong>Forward Data</strong></label>
                            <div className="card">
                                <div className="card-body">
                                <strong id="forward_nt">{fPnt} nt</strong>
                                <br></br>
                                <strong id="forward_gc">{fPGC.toFixed(0)} %GC</strong>
                                <br></br>
                                <strong  id="forward_tm">{fPTm.toFixed(0)} Tm(C)</strong>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="row justify-content-center p-3">
                    <div className="col-md-3">
                        <label htmlFor="reverse_primer_name" className="form-label">Reverse Primer Name</label>
                        <input 
                            className="form-control" 
                            type="text"
                            onChange={(e) => setRPName(e.target.value)}
                            id="reverse_primer_name" 
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="reverse_primer" className="form-label">Reverse Primer</label>
                        <input 
                            className="form-control" 
                            type="text"
                            onChange={(e) => handlePrimerInput(e, setRPrimer, setRPnt, setRPGC, setRPTm)}
                            id="reverse_primer" 
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="reverse_data" className="form-label"><strong>Reverse Data</strong></label>
                            <div className="card">
                                <div className="card-body">
                                <strong id="reverse_nt">{rPnt} nt</strong>
                                <br/>
                                <strong id="reverse_gc">{rPGC.toFixed(0)} %GC</strong>
                                <br/>
                                <strong id="reverse_tm">{rPTm.toFixed(0)} Tm(C)</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="row justify-content-center text-center p-3">
                    <div className="col-md-4">
                        <label htmlFor="poly_select">Choose a polymerase:</label>
                        <select 
                            name="poly_select" 
                            id="poly_select"
                            value={polyermase}
                            onChange={(e) => setPolymerase(e.target.value)}
                            >
                            <option value="Q5">Q5</option>
                            <option value="TAQ">TAQ</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="pcr_len">Expected Product Size:</label>
                        <input 
                            type="int" 
                            id="pcr_len" 
                            onChange={(e) => setProductSize(e.target.value)}
                            />
                        <select 
                            name="pcr_len_select" 
                            id="pcr_len_select"
                            // value={isKB}
                            onChange={pcrLenSelector}>
                            <option value="bp">bp</option>
                            <option value="kb">kb</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="label">Reaction Conditions:</label>
                        <select 
                            name="rxn_select" 
                            id="rxn_select"
                            onChange={(e) => setReactConditions(e.target.value)}
                            >
                            <option value="2-Step">2-Step</option>
                            <option value="3-Step">3-Step</option>
                        </select>
                    </div>
                </div>
                </form>
            </div>
            <div className="row justify-content-center p-3">
                <Button variant='primary' onClick={() => calculate()}>
                    Calculate
                </Button>
            </div>
            <div className="row justify-content-center text-center p-3">
            <div className="table-responsive">
                <table className="table" id="tbl_saves">
                    <thead>
                        <tr>
                            <th>Forward Primer Name</th>
                            <th>Forward Primer</th>
                            <th>Reverse Primer Name</th>
                            <th>Reverse Primer</th>
                            <th>Fragment Size (bp)</th>
                            <th>Polymerase Used</th>
                            <th>Reaction Conditions</th>
                        </tr>
                    </thead>
                    <tbody id='calculated_row'>{calculateRow}</tbody>
                </table>
            </div>
                </div>
                <div className="row justify-content-center p-3">
                    <div className="col text-center">
                        <Button variant='secondary' onClick={() => logout()}>
                            Save
                        </Button>
                </div>
            </div>
        </main>
    );
}