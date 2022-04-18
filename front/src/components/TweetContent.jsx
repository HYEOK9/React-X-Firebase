import { doc, deleteDoc } from 'firebase/firestore';

const TweetContent = ({ tweet, isOwner, db }) => {
    const onDelete = async (id) => {
        if (window.confirm('삭제 하시겠습니까?')) {
            await deleteDoc(doc(db, 'tweets', id));
        }
    };
    const onEdit = async (id) => {
        console.log('기능 구현중');
    };
    return (
        <div>
            <h4>
                {'=>'} {tweet.content}
                {isOwner ? (
                    <button
                        onClick={() => onEdit(tweet.docId)}
                        style={{ marginLeft: 10 }}
                    >
                        수정
                    </button>
                ) : null}
                {isOwner ? (
                    <button
                        onClick={() => onDelete(tweet.docId)}
                        style={{ marginLeft: 5 }}
                    >
                        삭제
                    </button>
                ) : null}{' '}
            </h4>
            <span style={{ fontSize: 12 }}>by {tweet.author}</span>
        </div>
    );
};

export default TweetContent;
