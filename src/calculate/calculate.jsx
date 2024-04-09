import React from 'react';

import Button from 'react-bootstrap/Button';

export function Calculate(props) {
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
                        <input type="text" className="form-control" id="forward_primer_name" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="forward_primer" className="form-label">Forward Primer</label>
                        <input type="text" className="form-control" id="forward_primer" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="forward_data" className="form-label"><strong>Forward Data</strong></label>
                            <div className="card">
                                <div className="card-body">
                                <strong id="forward_nt">-- nt</strong>
                                <br></br>
                                <strong id="forward_gc">-- %GC</strong>
                                <br></br>
                                <strong  id="forward_tm">-- Tm(C)</strong>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="row justify-content-center p-3">
                    <div className="col-md-3">
                        <label htmlFor="reverse_primer_name" className="form-label">Reverse Primer Name</label>
                        <input type="text" className="form-control" id="reverse_primer_name" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="reverse_primer" className="form-label">Reverse Primer</label>
                        <input type="text" className="form-control" id="reverse_primer" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="reverse_data" className="form-label"><strong>Reverse Data</strong></label>
                            <div className="card">
                                <div className="card-body">
                                <strong id="reverse_nt">-- nt</strong>
                                <br/>
                                <strong id="reverse_gc">-- %GC</strong>
                                <br/>
                                <strong id="reverse_tm">-- Tm(C)</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="row justify-content-center text-center p-3">
                    <div className="col-md-4">
                        <label htmlFor="poly_select">Choose a polymerase:</label>
                        <select name="poly_select" id="poly_select">
                            <option value="Q5">Q5</option>
                            <option value="TAQ">TAQ</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="pcr_len">Expected Product Size:</label>
                        <input type="int" id="pcr_len" />
                        <select name="pcr_len_select" id="pcr_len_select">
                            <option value="kb">kb</option>
                            <option value="bp">bp</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="label">Reaction Conditions:</label>
                        <select name="rxn_select" id="rxn_select">
                            <option value="2-Step">2-Step</option>
                            <option value="3-Step">3-Step</option>
                        </select>
                    </div>
                </div>
                </form>
            </div>
            <div className="row justify-content-center p-3">
                <Button variant='primary' onClick={() => navigate('/calculate')}>
                    Calculate
                </Button>
            </div>
            <div className="row justify-content-center text-center p-3">
            <div className="table-responsive">
                <table className="table" id="tbl_saves">
                <tr>
                    <th>Forward Primer Name</th>
                    <th>Forward Primer</th>
                    <th>Reverse Primer Name</th>
                    <th>Reverse Primer</th>
                    <th>Fragment Size (bp)</th>
                    <th>Polymerase Used</th>
                    <th>Reaction Conditions</th>
                </tr>
                <tr>
                    <td>sfGFP_F</td>
                    <td>AGCTTTGCCAATG</td>
                    <td>sfGFP_R</td>
                    <td>GTCACCCTTGTAAA</td>
                    <td>789</td>
                    <td>Q5</td>
                    <td>2-Step:<br/>68C for 30 seconds</td>
                </tr>
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