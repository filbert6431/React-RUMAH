export default function Inputfield({ label, type, placeholder, className, onChange }) {
    return ( 
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
        <input type={type}
            placeholder={placeholder} 
                // Dengan class name dibawah.. itu bekerja sebagai templatenya
                // Dia enggak harus di isi oleh classname dari Component si parent 
                //    / tempat ia digunakan... tapi bisa kita modif kayak biasa prop diatas
                //   cthnya di bagian nama 
                 className={`w-full p-2 border border-gray-300 rounded ${className}`}
                 onChange={onChange}
            
       />
    </div>
    )
}