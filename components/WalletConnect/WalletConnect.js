import { Box, Button, Grid, Modal } from '@mui/material';
import { SignClient } from '@walletconnect/sign-client';
import { getSdkError } from "@walletconnect/utils";
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Helpers from '../helper';
import Qrconnect from './qr-connect';
import Typo from '../customcomponents/Typo';
import CopyToClipboard from 'react-copy-to-clipboard';
import { globalValue } from '../misc/globalvalue';
import Wallet from '/icons/wallet';
import Help from '/icons/help';
import Settings from '/icons/settings';
import Users from '/icons/user';
import { styles } from '../../styles/explore.module.css';

const projectIDNew = "0d5b3b608b95f5503c67ca9cdfa8c726";
const CHIA_SEND_TRANSACTION = "chia_sendTransaction"
const CHIA_NEW_ADDRESS = "chia_getNextAddress"
const CHIA_LOG_IN = 'chia_logIn'
const CHIA_SIGN_MESSAGE_BY_ADDRESS = 'chia_signMessageByAddress'
const CHIA_SIGN_MESSAGE_BY_ID = 'chia_signMessageById'
const CHIA_SIGN_GET_WALLETS = 'chia_getWallets'
const CHIA_GET_WALLET_SYNC_STATUS = 'chia_getSyncStatus'
const CHIA_METHODS = [CHIA_SEND_TRANSACTION, CHIA_NEW_ADDRESS, CHIA_LOG_IN, CHIA_SIGN_MESSAGE_BY_ADDRESS, CHIA_SIGN_MESSAGE_BY_ID, CHIA_SIGN_GET_WALLETS, CHIA_GET_WALLET_SYNC_STATUS]
const DEFAULT_APP_METADATA = {
    name: "Spacescan.io",
    description: "React App for WalletConnect by spacescan",
    url: "https://www.spacescan.io/",
    icons: ["https://www.spacescan.io/spacescan-logo-192.png"],
};
let accountNumberValue = undefined;
let signClientValue = undefined;
let sessionValue = undefined;
let connectedValue = false;

export const WalletConnect = forwardRef((probs, ref) => {
    const location = useRouter();
    const [signClient, setSignClient] = useState(SignClient | undefined > (undefined));
    const [connected, setConnected] = useState(false);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [walletConnectSessionId, setWalletConnectSessionId] = useState("");
    const [showWalletConnectSession, setShowWalletConnectSession] = useState(false);
    // const [pairings, setPairings] = useState<PairingTypes.Struct>([PairingTypes.Struct]);
    const [session, setSession] = useState({});
    const [pairings, setPairings] = useState({});
    const [accountNumber, setAccountNumber] = useState(undefined);
    const [activeConnection, setActiveConnection] = useState('walletconnect');

    const handleClose = () => {
        setShowConnectModal(false);
        setShowWalletConnectSession(false);
    };

    // 3. Initialize sign client
    async function onInitializeSignClient() {
        try {
            const client = await SignClient.init({ projectId: projectIDNew, metadata: DEFAULT_APP_METADATA })
            // signClient = client;
            // await _checkPersistedState(client);
            client.on("session_event", ({ event }) => {
                // Handle session events, such as "chainChanged", "accountsChanged", etc.
            });

            client.on("session_update", ({ topic, params }) => {
                const { namespaces } = params;
                const _session = signClient.session.get(topic);
                // Overwrite the `namespaces` of the existing session with the incoming one.
                const updatedSession = { ..._session, namespaces };
                // Integrate the updated session state into your dapp state.
                // onSessionUpdate(updatedSession);
                onSessionConnected(updatedSession);
            });

            client.on("session_delete", () => {
                reset();
                // Session was deleted -> reset the dapp state, clean up from user session, etc.
            });
            setSignClient(client);
            signClientValue = client;
            setPairings(client.pairing.getAll({ active: true }));
            if (client.session.length) {
                const lastKeyIndex = client.session.keys.length - 1;
                const _session = client.session.get(
                    client.session.keys[lastKeyIndex]
                );
                setSession(_session);
                sessionValue = _session;

                await onSessionConnected(_session);
            }
        }
        catch (e) {

        }
    }

    function reset() {
        setSession(undefined);
        sessionValue = undefined;
    };

    useImperativeHandle(ref, () => ({
        openConnect() {
            onOpenModal();
        }
    }));

    // 4. Initiate connection and pass pairing uri to the modal
    async function onOpenModal() {
        if (signClient) {
            const namespaces = {
                chia: { chains: ['chia:mainnet'], methods: CHIA_METHODS, events: [] }
            }

            const { uri, approval } = await signClient.connect({
                pairingTopic: pairings?.topic,
                requiredNamespaces: namespaces
            })
            if (uri) {
                setWalletConnectSessionId(uri);
                setShowWalletConnectSession(true);
                /*QRCodeModal.open(uri, () => {
                    console.log("EVENT", "QR Code Modal closed");
                });*/
                const sessionApproved = await approval();
                await onSessionConnected(sessionApproved);
                setSession(sessionApproved);
                sessionValue = sessionApproved;
                setShowWalletConnectSession(false);
                //QRCodeModal.close()
            }
        }
    }

    async function onSessionConnected(_session) {
        const allNamespaceAccounts = Object.values(_session.namespaces)
            .map((namespace) => namespace.accounts)
            .flat();
        const allNamespaceChains = Object.keys(_session.namespaces);
        let accountDetails = allNamespaceAccounts[0].split(":");
        setConnected(true);
        connectedValue = true;
        globalValue.walletConnected = true;
        globalValue.fingerPrintId = accountDetails[2];
        setAccountNumber(accountDetails[2]);
        accountNumberValue = accountDetails[2];
        // if (String(location?.pathname).endsWith("myprofile") && globalValue.profileReloadRequired) {
        //     window.location = Helpers.getFullPath() + "myprofile";
        // }
    }

    async function onDisconnect() {
        if (typeof signClient === undefined) {
            throw new Error("WalletConnect is not initialized");
        }
        await signClient.disconnect({
            topic: session.topic,
            reason: getSdkError("USER_DISCONNECTED"),
        }
        );
        reset();
        connectedValue = false;
        setConnected(false);
        setShowConnectModal(false);
        globalValue.walletConnected = false;
        globalValue.fingerPrintId = undefined;
        // if (String(location?.pathname).endsWith("myprofile")) {
        //     window.location = Helpers.getFullPath() + "myprofile";
        // }
    }

    useEffect(() => {
        onInitializeSignClient();
    }, [])

    return (
        <div className={undefined != probs.className ? probs.className : ""}>
            <Modal open={showWalletConnectSession}>
                <Box className='modal borderNone'>
                    <Box className='head'>
                        <Typo className='wl'>Connect a Wallet</Typo>
                        <Typo className='se'>Choose how you want to connect.</Typo>
                    </Box>
                    <Box className='tab'>
                        <Button className={activeConnection === 'walletconnect' ? 'btnactive' : 'btninactive'} onClick={() => setActiveConnection('walletconnect')}> <img src='/images/wallet-connect.svg' alt='' /><Typo className='wc'>Wallet Connect</Typo></Button>
                        <Button className={activeConnection === 'gobiwallet' ? 'btnactive' : 'btninactive'} onClick={() => setActiveConnection('gobiwallet')}> <img src='/images/Gobi-Wallet.svg' alt='' /><Typo className='wc'>Gobi Wallet</Typo></Button>
                    </Box>
                    {activeConnection === 'walletconnect' ?
                        <Box className='qr' display='flex' alignItems='center' justifyContent='center'>

                            <img src='/images/close-wallet.svg' className='close' alt='' onClick={handleClose} />

                            <Box display='flex'>
                                <img src='/images/wallet-connect-sm.svg' alt='' />
                                <Typo className='txt'>Scan QR code/ Copy link</Typo>
                            </Box>
                            <Box className='code' display='flex' justifyContent='center'>
                                <Qrconnect value={walletConnectSessionId} />
                            </Box>
                            <CopyToClipboard text={walletConnectSessionId}>
                                <Button className='texttransNone'>
                                    <Typo className='copy'>Copy to clipboard</Typo>
                                </Button>
                            </CopyToClipboard>

                        </Box>
                        :
                        <Box className='qr' display='flex' alignItems='center' justifyContent='center'>
                            <img src='/images/close-wallet.svg' className='close' alt='' onClick={handleClose} />
                            <Typo className='txt'>Gobi Wallet Connect</Typo>
                        </Box>
                    }

                </Box>
            </Modal>

            <Modal open={showConnectModal} disableScrollLock={true} className='modal1'>
                <Box className='profileModal'>
                    <img src='/images/close-wallet.svg' className='closeprofile' alt='' onClick={handleClose} />

                    <Box className='profilebox'>
                        <Box className='namebox'>
                            <img className="cursor-pointer" src='/images/wallet-connected.svg' width="41" height="41" />
                            <Typo className='name'>Name</Typo>
                        </Box>
                        <Box className='descbox'>
                            <Grid container>
                                <Grid item md={6} display='flex' flexDirection='row'>
                                    <Wallet />
                                    <Box>
                                        <Typo className='wl'>Wallet</Typo>
                                        <Typo className='id'>{accountNumberValue}</Typo>
                                    </Box>

                                </Grid>
                                <Grid item md={6}> <Box justifyContent='end' display='flex'>  <Button variant='text' className='diconnectbtn' onClick={onDisconnect}>Disconnect</Button>
                                </Box>  </Grid>
                            </Grid>

                        </Box>

                    </Box>
                    <Box className='btmbox' display='flex' flexDirection='column'>

                        <Button className='btn'><Users /> <Typo className='btntxt'>Profile</Typo> </Button>
                        <Button className='btn'><Help /><Typo className='btntxt'>Help</Typo></Button>
                        <Button className='btn'> <Settings /><Typo className='btntxt'>Settings</Typo></Button>
                    </Box>
                </Box>

            </Modal>
            {
                !connected ? (
                    <Button variant="contained" className='connectwallet' disableElevation onClick={onOpenModal}>Connect Wallet</Button>
                ) : (
                    <Button block size="sm" onClick={() => setShowConnectModal(true)}>
                        <img className="cursor-pointer" src='/images/wallet-connected.svg' width="38" height="38" />
                    </Button>
                )
            }
        </div>
    )
});

export const SubmitProject = () => {
    const walletRef = useRef();
    const router = useRouter();

    async function handkleClick() {
        if (globalValue.walletConnected) {
            router.push("/submit");
        }
        else {
            walletRef.current.openConnect();
        }
    }
    return (
        <>
            <WalletConnect className='hidden' ref={walletRef} />
            <Button style={{height:"35px"}} className='btn' onClick={handkleClick}>Submit Project</Button>
        </>
    );
}

export const Vote = ({ allVotes }) => {
    const walletRef = useRef();

    async function handleClick() {
        if (globalValue.walletConnected) {
            // do something when wallet is connected
        } else {
            walletRef.current.openConnect();
        }
    }

    return (
        <>
            <WalletConnect className='hidden' ref={walletRef} />
            <Button onClick={handleClick}>
                <div className="card-number">
                    <div className="card-arrow">&#9650;</div>
                    <div className="card-num">{allVotes>0?allVotes:0}</div>
                </div>
            </Button>
        </>
    );
}
