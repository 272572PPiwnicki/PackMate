import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import {
	getChecklistById,
	updateChecklistName,
} from "../../database/checklistModel";
import {
	addItem,
	deleteItem,
	getItemsByChecklistId,
	toggleItemPacked,
} from "../../database/itemModel";
// import { MaterialIcons } from '@expo/vector-icons';

export default function ChecklistDetailScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const checklistId = parseInt(id as string);

	const [title, setTitle] = useState("");
	const [items, setItems] = useState<
		{ id: number; name: string; packed: number }[]
	>([]);
	const [newItem, setNewItem] = useState("");

	const loadItems = useCallback(() => {
		const data = getItemsByChecklistId(checklistId);
		setItems(data);
	}, [checklistId]);

	const loadChecklistName = useCallback(() => {
		const checklist = getChecklistById(checklistId);
		if (checklist) {
			setTitle(checklist.name);
		}
	}, [checklistId]);

	useEffect(() => {
		loadItems();
		loadChecklistName();
	}, [loadItems, loadChecklistName]);

	const handleAddItem = () => {
		if (!newItem.trim()) return;
		addItem(checklistId, newItem);
		setNewItem("");
		loadItems();
	};

	const handleToggle = (itemId: number, packed: number) => {
		toggleItemPacked(itemId, packed);
		loadItems();
	};

	const handleDelete = (itemId: number) => {
		deleteItem(itemId);
		loadItems();
	};

	const handleRenameChecklist = () => {
		if (title.trim()) {
			updateChecklistName(checklistId, title.trim());
			router.replace("/");
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: "#fff" }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}>
			<ScrollView contentContainerStyle={{ padding: 20 }}>
				<Text style={{ fontSize: 18, marginBottom: 6 }}>Edytuj nazwę:</Text>
				<View style={{ flexDirection: "row", marginBottom: 16 }}>
					<TextInput
						value={title}
						onChangeText={setTitle}
						placeholder="Nazwa checklisty"
						placeholderTextColor="#999"
						style={{
							flex: 1,
							borderWidth: 1,
							borderColor: "#aaa",
							borderRadius: 8,
							padding: 10,
							marginRight: 10,
							color: "#000",
						}}
					/>
					<Pressable
						onPress={handleRenameChecklist}
						style={{
							backgroundColor: "#00A6FF",
							paddingHorizontal: 20,
							paddingVertical: 10,
							borderRadius: 999,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text style={{ color: "white", fontWeight: "bold" }}>Zapisz</Text>
					</Pressable>
				</View>

				<Text style={{ fontSize: 20, marginBottom: 10 }}>
					Rzeczy do spakowania
				</Text>
				{items.map((item) => (
					<View
						key={item.id}
						style={{
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "#eee",
							borderRadius: 8,
							padding: 12,
							marginVertical: 4,
							justifyContent: "space-between",
						}}>
						<Pressable
							onPress={() => handleToggle(item.id, item.packed)}
							style={{
								width: 24,
								height: 24,
								borderRadius: 12,
								borderWidth: 2,
								borderColor: "#555",
								backgroundColor: item.packed ? "#FFD700" : "transparent",
								alignItems: "center",
								justifyContent: "center",
								marginRight: 12,
							}}>
							{item.packed ? (
								<Text style={{ color: "#000", fontSize: 14 }}>✓</Text>
							) : (
								<></>
							)}
						</Pressable>

						<Text
							style={{
								flex: 1,
								fontSize: 16,
								color: "#000",
								textDecorationLine: item.packed ? "line-through" : "none",
							}}>
							{item.name}
						</Text>

						<Pressable onPress={() => handleDelete(item.id)}>
							<Text style={{ color: "red" }}>Usuń</Text>
						</Pressable>
					</View>
				))}

				<View style={{ flexDirection: "row", marginTop: 20 }}>
					<TextInput
						value={newItem}
						onChangeText={setNewItem}
						placeholder="Dodaj nowy przedmiot"
						placeholderTextColor="#999"
						style={{
							flex: 1,
							borderWidth: 1,
							borderColor: "#aaa",
							borderRadius: 8,
							padding: 10,
							marginRight: 10,
							color: "#000",
						}}
					/>
					<Pressable
						onPress={handleAddItem}
						style={{
							backgroundColor: "#00A6FF",
							paddingHorizontal: 20,
							paddingVertical: 10,
							borderRadius: 999,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text style={{ color: "white", fontWeight: "bold" }}>Dodaj</Text>
					</Pressable>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
