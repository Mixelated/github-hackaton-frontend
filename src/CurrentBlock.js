import React, { useState } from 'react';
import { useSubstrate } from './substrate-lib';

function CurrentBlock(){
    const { api } = useSubstrate();
    const [bn, setBn] = useState('');
    const [bh, setBh] = useState('');
    const [ph, setPh] = useState('');
    const [er, setEr] = useState('');

    const recursiveBlock = async () => {
        const latestBlock = await api.rpc.chain.getHeader()
        setBn(latestBlock.number)
        setBh(latestBlock.hash)
        setPh(latestBlock.parentHash)
        setEr(latestBlock.extrinsicsRoot)
        recursiveBlock()
    }
    recursiveBlock()

    return (
        <div>
        <h3>Current Block Info</h3>
        <table>
            <tbody>
            <tr> 
                <td>
                Parent Hash 
                </td>
                <td style={{fontWeight: 600}}>{ph.toString()}</td>
            </tr>
            <tr> 
                <td>
                Block Number 
                </td>
                <td style={{fontWeight: 600}}>{bn.toString()}</td>
            </tr>
            <tr> 
                <td>
                Block Hash 
                </td>
                <td style={{fontWeight: 600}}>{bh.toString()}</td>
            </tr>
            <tr> 
                <td>
                Extrinsics Root 
                </td>
                <td style={{fontWeight: 600}}>{er.toString()}</td>
            </tr>
            </tbody>
        </table>
        </div>
    );
}

export default CurrentBlock;