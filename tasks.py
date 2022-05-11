from invoke import task

@task
def set_environment(c, command):
    try:
        c.run('npm install')
        c.run('make build')
        c.run('make run')
        c.run('make logs')
    except:
        print('\n Something went wrong')
