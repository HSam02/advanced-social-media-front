import Cropper from "react-cropper";

export default () => {
  return (
    <>
      <Cropper
        // zoomTo={0.5}
        initialAspectRatio={4 / 5}
        // preview=".img-preview"
        src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
        style={{ width: "500px", height: "500px" }}
        dragMode="move"
        viewMode={1}
        // autoCrop={true}
        cropBoxMovable={false}
        cropBoxResizable={false}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
        onInitialized={(instance) => {
          console.log(instance);
        }}
        guides={true}
      />
    </>
  );
};
