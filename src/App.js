function App() {
    // 컴포넌트를 연결시켜줄 함수
    const destination = (user) => {
        return <Destination user={user} />
    }

    // 사용자 권한 가정
    const user = { authority: '2' }

    // router 부분
    return (
        <Routes>
            <Route
                path="./table/index"
                element={
                    <Auth Component={destination} user={user} cpAuth={'1'} />
                }
            />
        </Routes>
    )
}
