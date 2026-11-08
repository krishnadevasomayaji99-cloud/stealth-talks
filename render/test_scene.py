import bpy, sys
out = sys.argv[sys.argv.index("--") + 1]
s = bpy.context.scene
s.render.resolution_x, s.render.resolution_y = 1080, 1920
s.render.fps = 30; s.frame_start, s.frame_end = 1, 45 * 30   # full 45 s
s.render.filepath = out + "/"; s.render.image_settings.file_format = "PNG"
try: s.render.engine = "BLENDER_EEVEE_NEXT"
except TypeError: s.render.engine = "BLENDER_EEVEE"
bpy.ops.mesh.primitive_cube_add(); c = bpy.context.active_object
c.keyframe_insert("location", frame=1); c.location.x = 3; c.keyframe_insert("location", frame=s.frame_end)
bpy.ops.render.render(animation=True)
