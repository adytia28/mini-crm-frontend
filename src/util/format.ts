export function formatTanggalIndonesia(isoString: string): string {
  const date = new Date(isoString);

  const tanggal = date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const jam = String(date.getHours()).padStart(2, '0');
  const menit = String(date.getMinutes()).padStart(2, '0');
  const detik = String(date.getSeconds()).padStart(2, '0');

  const waktu = `${jam}:${menit}:${detik}`;

  return `${tanggal}, ${waktu}`;
}