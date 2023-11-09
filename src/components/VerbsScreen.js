import React, { useEffect, useState, useMemo } from 'react';
import { Divider, Typography, Container, TextField, Drawer, IconButton, ListItemButton, ListItemText } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import VerbScreen from './VerbScreen';

const VerbsScreen = ({showVerbsScreen, setShowVerbsScreen}) => {
    const [verbs, setVerbs] = useState([]);
    const [selectedVerb, setSelectedVerb] = useState(null);
    const [openVerbScreen, setOpenVerbScreen] = useState(false);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllVerbs = async () => {
            try {
                const response = await fetch(`/api/verbs`);
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                const data = await response.json();
                setVerbs(data);
                console.log("Verbs Screen data: ", {data})
            } catch (error) {
                setError(error);
            }
        }

        fetchAllVerbs();
    }, []);

    // Need to make changes here if you want search to come back for Eng infinitive and conjugations
    const filteredVerbs = verbs.filter(v => v.infinitive.includes(search));

    const commonVerbs = useMemo( () =>
        verbs.filter(v => v.infinitive.includes(search) && v.common),
        [verbs, search]
    );
    const uncommonVerbs = useMemo( () =>
        verbs.filter(v => v.infinitive.includes(search) && !v.common),
        [verbs, search]
    );

    const rowRenderer = ({ index, style }) => {
        const item = filteredVerbs[index];
        return (
            <ListItemButton
                style={style}  // Apply styles provided by react-window
                key={item.infinitive}
                onClick={() => {
                    setSelectedVerb(item)
                    setOpenVerbScreen(true)
                }}
            >
            <ListItemText
                primary={item.infinitive}
                secondary={item.englishInfinitive}
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            />
            </ListItemButton>
        );
    };

    return (
        <div style={{overflowY: 'hidden'}}>
            <Drawer
                anchor="right"
                open={showVerbsScreen}
                onClose={() => {
                    setShowVerbsScreen(false)
                    setSelectedVerb(null)
                }}
                style={{overflowY: 'hidden'}}
            >
                <Container
                    style={{ 
                        width: '40vw', 
                        minWidth: '300px',
                        overflowX: 'hidden'
                    }}            

                >
                    <Typography variant="h4" gutterBottom>
                        Verbs
                    </Typography>

                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <List
                        height={400}  // Adjust height to fit your design
                        width="100%"  // Adjust width to fit your design
                        itemSize={80}  // Adjust item size to fit your design
                        itemCount={filteredVerbs.length}
                        itemData={filteredVerbs}
                    >
                        {rowRenderer}
                    </List>
                </Container>
            </Drawer>
            {selectedVerb && <VerbScreen selectedVerb={selectedVerb} openVerbScreen={openVerbScreen} setOpenVerbScreen={setOpenVerbScreen} />}
        </div>
    );
}

export default VerbsScreen;