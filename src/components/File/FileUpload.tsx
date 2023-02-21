import React from 'react'
import { Box, styled, Typography } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import clsx from 'clsx'
import FileUploadDefaultImage from './FileUploadDefaultImage.png'

export type FileUploadProps = {
    imageButton?: boolean
    accept: string
    hoverLabel?: string
    dropLabel?: string
    width?: string
    height?: string
    backgroundColor?: string
    image?: {
        url: string
        imageStyle?: {
            width?: string
            height?: string
        }
    }
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onDrop: (event: React.DragEvent<HTMLElement>) => void
}
// const useStyle = makeStyles({
//     root: {
//         cursor: 'pointer',
//         textAlign: 'center',
//         display: 'flex',
//         '&:hover p,&:hover svg,& img': {
//             opacity: 1,
//         },
//         '& p, svg': {
//             opacity: 0.4,
//         },
//         '&:hover img': {
//             opacity: 0.3,
//         },
//     },
//     noMouseEvent: {
//         pointerEvents: 'none',
//     },
//     iconText: {
//         display: 'flex',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         alignItems: 'center',
//         position: 'absolute',
//     },
//     hidden: {
//         display: 'none',
//     },
//     onDragOver: {
//         '& img': {
//             opacity: 0.3,
//         },
//         '& p, svg': {
//             opacity: 1,
//         },
//     },
// })

const Root = styled('label')({
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    '&:hover p,&:hover svg,& img': {
        opacity: 1,
    },
    '& p, svg': {
        opacity: 0.4,
    },
    '&:hover img': {
        opacity: 0.3,
    }
})

const NoMouseEvent = styled('div')({
    noMouseEvent: {
        pointerEvents: 'none',
    }
})

const IconText = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
})

const Hidden = styled('input')({
    display: 'none',
})
   
const OnDragOver = styled('label') ({
    '& img': {
        opacity: 0.3,
    },
    '& p, svg': {
        opacity: 1,
    }
})

export const FileUpload: React.FC<FileUploadProps> = ({
    accept,
    imageButton = false,
    hoverLabel = 'Click or drag to upload file',
    dropLabel = 'Drop file here',
    width = '600px',
    height = '100px',
    backgroundColor = '#333',
    image: {
        url = FileUploadDefaultImage,
        imageStyle = {
            height: 'inherit',
        },
    } = {},
    onChange,
    onDrop,
}) => {
    //const classes = useStyle()
    const [imageUrl, setImageUrl] = React.useState(url)
    const [labelText, setLabelText] = React.useState<string>(hoverLabel)
    const [isDragOver, setIsDragOver] = React.useState<boolean>(false)
    const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false)
    const stopDefaults = (e: React.DragEvent) => {
        e.stopPropagation()
        e.preventDefault()
    }
    const dragEvents = {
        onMouseEnter: () => {
            setIsMouseOver(true)
        },
        onMouseLeave: () => {
            setIsMouseOver(false)
        },
        onDragEnter: (e: React.DragEvent) => {
            stopDefaults(e)
            setIsDragOver(true)
            setLabelText(dropLabel)
        },
        onDragLeave: (e: React.DragEvent) => {
            stopDefaults(e)
            setIsDragOver(false)
            setLabelText(hoverLabel)
        },
        onDragOver: stopDefaults,
        onDrop: (e: React.DragEvent<HTMLElement>) => {
            stopDefaults(e)
            setLabelText(hoverLabel)
            setIsDragOver(false)
            if (imageButton && e.dataTransfer.files[0]) {
                setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]))
            }
            onDrop(e)
        },
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (imageButton && event.target.files[0]) {
            setImageUrl(URL.createObjectURL(event.target.files[0]))
        }

        onChange(event)
    }

    return (
        <>
            <Hidden
                onChange={handleChange}
                accept={accept}
                id="file-upload"
                type="file"
            />

            <Root
                htmlFor="file-upload"
                {...dragEvents}
                className={clsx(Root, isDragOver && OnDragOver)}
            >
                <Box
                    width={width}
                    height={height}
                    bgcolor={backgroundColor}
                    className={clsx(NoMouseEvent)}
                >
                    {imageButton && (
                        <Box position="absolute" height={height} width={width}>
                            <img
                                alt="file upload"
                                src={imageUrl}
                                style={imageStyle}
                            />
                        </Box>
                    )}

                    {(!imageButton || isDragOver || isMouseOver) && (
                        <>
                            <Box
                                height={height}
                                width={width}
                                className={clsx(IconText)}
                            >
                                <CloudUpload fontSize="large" />보이세요 ..?
                                <Typography>{labelText}</Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </Root>
        </>
    )
}
