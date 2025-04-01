export default function getTomorrowDay(): string {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	return String(tomorrow.getDate()).padStart(2, "0");
}
