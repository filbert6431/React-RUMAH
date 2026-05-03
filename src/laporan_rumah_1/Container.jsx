export default function Container({children}){
    return(
        <div>
            <h1>Biodata Mahasiswa</h1>
            <br/>
                {children}
            <br/>
            <footer>
                <p>2026 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    )
}