import { Ionicons } from '@expo/vector-icons';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import React, { useCallback, useMemo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';

const BottomSheetList = React.memo(({ data, filterType, selectedGeneration, setSelectedGeneration, selectedTypes, setSelectedTypes }) => {
    const datafilter = useMemo(() => data, [data]);

    const handlePress = useCallback((selectedItem) => {
        if (filterType === 'generations') {
            setSelectedGeneration((prev) => {
                const exists = prev.find((gen) => gen.id === selectedItem.id);
                if (exists) {
                    return prev.filter((gen) => gen.id !== selectedItem.id);
                }
                return [...prev, selectedItem];
            });
        } else if (filterType === 'types') {
            setSelectedTypes((prev) => {
                if (prev.includes(selectedItem)) {
                    return prev.filter((type) => type.id !== selectedItem.id);
                }
                return [...prev, selectedItem];
            });
        }
    }, [filterType, setSelectedGeneration, setSelectedTypes]);

    const renderItem = useCallback(
        ({item}) => {
            const isSelected = filterType === "generations" 
                    ? selectedGeneration.some((gen) => gen.id === item.id)
                    : selectedTypes.some((type) => type.id === item.id);
            return (
                <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 10, flexDirection: "row"}} onPress={() => handlePress(item)}>
                    <Text style={{fontFamily: "poppins", textAlign: "left", marginRight: 5}}>{item.name}</Text>
                    {isSelected && (<Ionicons name="checkmark" size={20} color="green" />)}
                </TouchableOpacity>
            )
        },
        [filterType, selectedGeneration, selectedTypes, handlePress]
    );

    return (
        <BottomSheetFlatList
            data={datafilter}
            renderItem={renderItem}
        />
    )
});

export default BottomSheetList
