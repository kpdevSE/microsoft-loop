export default function DocumentList({ documentList }) {
  console.log(documentList);
  return (
    <div>
      {documentList.map((doc, index) => {
        return (
          <div key={index}>
            <div>
              <h2>{doc.documentName}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
